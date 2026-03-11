import pexpect
import sys
import os

def run_rsync():
    host = "162.246.57.249"
    port = "2200"
    user = "saltanat"
    password = "2T30zW2wmq"
    local_path = "./"
    remote_path = f"{user}@{host}:domains/demo.thesaltanat.com/public_html/"
    
    # Exclude files we don't want to sync
    excludes = [
        "node_modules",
        ".next",
        ".git",
        ".env*",
        "ssh_helper.py",
        "rsync_helper.py",
        "*.webp"
    ]
    
    exclude_args = " ".join([f"--exclude='{e}'" for e in excludes])
    
    rsync_cmd = f"rsync -avz -e 'ssh -p {port}' {exclude_args} {local_path} {remote_path}"
    print(f"Running: {rsync_cmd}")
    
    child = pexpect.spawn(rsync_cmd, timeout=300) # 5 minutes timeout
    
    index = child.expect(['password:', 'Are you sure you want to continue connecting', pexpect.EOF, pexpect.TIMEOUT])
    
    if index == 0:
        child.sendline(password)
    elif index == 1:
        child.sendline('yes')
        child.expect('password:')
        child.sendline(password)
    elif index == 2:
        print("EOF encountered early")
        print(child.before.decode())
        return
    elif index == 3:
        print("Timeout encountered during connect")
        print(child.before.decode())
        return

    # Wait for completion and print output
    while True:
        try:
            line = child.readline()
            if not line:
                break
            print(line.decode().strip())
        except pexpect.EOF:
            break
        except Exception as e:
            print(f"Error reading line: {e}")
            break

    print("Rsync completed.")

if __name__ == "__main__":
    run_rsync()
