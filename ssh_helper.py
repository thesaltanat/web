import pexpect
import sys

def run_ssh_command(command):
    host = "162.246.57.249"
    port = "2200"
    user = "saltanat"
    password = "2T30zW2wmq"
    
    ssh_cmd = f"ssh -p {port} {user}@{host} '{command}'"
    print(f"Running: {ssh_cmd}")
    
    child = pexpect.spawn(ssh_cmd, timeout=600)
    
    index = child.expect(['password:', 'Are you sure you want to continue connecting', pexpect.EOF, pexpect.TIMEOUT])
    
    if index == 0:
        child.sendline(password)
    elif index == 1:
        child.sendline('yes')
        child.expect('password:')
        child.sendline(password)
    elif index == 2:
        print("EOF encountered")
        print(child.before.decode())
        return
    elif index == 3:
        print("Timeout encountered")
        print(child.before.decode())
        return

    child.expect(pexpect.EOF)
    print(child.before.decode())

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "ls -la"
    run_ssh_command(cmd)
