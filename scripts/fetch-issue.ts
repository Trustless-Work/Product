import { readFileSync, writeFileSync } from 'fs';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'Trustless-Work';
const REPO = 'trustlesswork-spikes';
const ISSUE_NUMBER = 168;

async function fetchIssue() {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${ISSUE_NUMBER}`, {
    headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
  });
  const issue = await res.json();
  writeFileSync('issue.json', JSON.stringify(issue, null, 2));
  console.log(JSON.stringify(issue, null, 2));
}

fetchIssue();
