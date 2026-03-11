import pexpect
import sys
import time

HOST = "162.246.57.249"
PORT = "2200"
USER = "saltanat"
PASS = "2T30zW2wmq"
REMOTE_DIR = "domains/demo.thesaltanat.com/public_html/"

def run_rsync():
    print(">>> Step 1: Uploading local code (Syncing with --delete)...")
    # Exclude heavy/generated/secret files
    excludes = [
        "node_modules",
        ".next",
        ".git",
        ".env*",
        "ssh_helper.py",
        "rsync_helper.py",
        "deploy.py",
        "full_deploy.py",
        "*.webp",
        ".DS_Store",
        "yarn.lock"
    ]
    exclude_args = " ".join([f"--exclude='{e}'" for e in excludes])
    
    # --delete ensures remote files not present locally are deleted (Clean slate)
    rsync_cmd = f"rsync -avz --delete -e 'ssh -p {PORT}' {exclude_args} ./ {USER}@{HOST}:{REMOTE_DIR}"

    # Wrap in bash to handle quotes correctly
    full_rsync_cmd = f"/bin/bash -c \"{rsync_cmd}\""
    print(f"Running Rsync: {full_rsync_cmd}")
    
    child = pexpect.spawn(full_rsync_cmd, timeout=600)
    
    index = child.expect(['password:', 'Are you sure you want to continue connecting', pexpect.EOF, pexpect.TIMEOUT])
    
    if index == 0:
        child.sendline(PASS)
    elif index == 1:
        child.sendline('yes')
        child.expect('password:')
        child.sendline(PASS)
    elif index == 2:
        print("EOF during rsync setup")
        print(child.before.decode() if child.before else "")
        return False
    elif index == 3:
        print("Timeout during rsync setup")
        return False

    # Read output
    try:
        output = child.read().decode()
    except Exception as e:
        print(f"Error reading rsync output: {e}")
        
    print("Rsync complete.")
    return True

def run_ssh_commands():
    print(">>> Step 2: running remote commands (Clean .next, Build, Restart)...")
    
    cmds = [
        f"cd {REMOTE_DIR}",
        "rm -rf .next yarn.lock", 
        "npm install --production --legacy-peer-deps", 
        "npm run build",
        "pm2 restart demo-app"
    ]
    
    full_cmd_str = " && ".join(cmds)
    
    # Wrap in bash to handle the single quotes for the SSH command properly
    ssh_cmd_bash = f"/bin/bash -c \"ssh -p {PORT} {USER}@{HOST} '{full_cmd_str}'\""
    
    print(f"Running Remote: {ssh_cmd_bash}")
    
    child = pexpect.spawn(ssh_cmd_bash, timeout=1200)
    
    index = child.expect(['password:', 'Are you sure you want to continue connecting', pexpect.EOF, pexpect.TIMEOUT])
    
    if index == 0:
        child.sendline(PASS)
    elif index == 1:
        child.sendline('yes')
        child.expect('password:')
        child.sendline(PASS)
    
    # Stream output
    while True:
        try:
            line = child.readline()
            if not line: break
            print(f"[Remote] {line.decode().strip()}")
        except pexpect.EOF:
            break
        except pexpect.TIMEOUT:
            print("Timeout reading remote output")
            break
            
    print("Remote commands finished.")

if __name__ == "__main__":
    if run_rsync():
        run_ssh_commands()
    else:
        print("Deployment failed.")
