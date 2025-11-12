# Automating Recon with SPARTA
*Category: Homelab / Recon*  
*Published: November 12, 2025*

---

## Overview
In this write-up, I walk through how I automated reconnaissance in my local homelab using **SPARTA**, integrating it with Nmap, Hydra, and Nikto for faster vulnerability discovery. The goal was to create a repeatable workflow for analyzing newly spun-up machines.

---

## Objectives
- Automate Nmap scanning and service detection
- Integrate Hydra for quick brute-force testing
- Export and organize results efficiently
- Practice good operational security while testing internally

---

## Lab Setup
My environment consisted of:
- **Kali Linux VM** (192.168.56.101)
- **Metasploitable2** (192.168.56.102)
- **SPARTA** pre-installed from Kali repo

> ⚙️ **Network mode:** Host-only adapter (192.168.56.0/24)

```bash#
 Example Nmap scan command used
nmap -sV -T4 192.168.56.102 -oX results.xml
Steps
1. Launching SPARTA
Opened SPARTA, set scan range, and configured Hydra plugin for brute-force testing.
SPARTA automatically ran Nmap scans and parsed output into categories.

2. Automating Workflows
Used Python scripting to execute SPARTA tasks on startup:

python
Copy code
import os
os.system("sparta -p profiles/default.xml --auto")
3. Reviewing Results
SPARTA exports clean HTML reports to /root/.sparta/reports/, which I archived for later analysis.

Key Takeaways
SPARTA saves significant time in recon workflows.

Automating repetitive tasks ensures consistency and reduces missed vulnerabilities.

This setup can be extended to continuous scanning using cron jobs or Python scripts.

Next Steps
In future iterations, I plan to:

Integrate Slack notifications for new findings

Experiment with SPARTA + Metasploit automation

Build a dashboard to track recurring vulnerabilities

Related Write-ups
Building My Homelab Network Segmentation

Getting Signal from Splunk: Incident Response Notes