import pexpect
import sys
import os

def sync_env():
    host = "162.246.57.249"
    port = "2200"
    user = "saltanat"
    password = "2T30zW2wmq"
    local_path = ".env"
    remote_path = f"{user}@{host}:domains/demo.thesaltanat.com/public_html/.env"
    
    rsync_cmd = f"rsync -avz -e 'ssh -p {port}' {local_path} {remote_path}"
    print(f"Running: {rsync_cmd}")
    
    child = pexpect.spawn(rsync_cmd, timeout=30)
    
    index = child.expect(['password:', 'Are you sure you want to continue connecting', pexpect.EOF, pexpect.TIMEOUT])
    
    if index == 0:
        child.sendline(password)
    elif index == 1:
        child.sendline('yes')
        child.expect('password:')
        child.sendline(password)
    
    child.expect(pexpect.EOF)
    print(child.before.decode())

if __name__ == "__main__":
    sync_env()
