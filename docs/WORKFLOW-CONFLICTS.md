# 🔧 Workflow Conflict Resolution

## Problem
When multiple GitHub Actions workflows try to update the README.md simultaneously, git conflicts can occur, causing push failures like:

```
! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://github.com/AtulFalle/ng-workly'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally.
```

## Solutions Implemented

### 1. **Enhanced Git Strategy**
All workflows now use a robust git strategy:
- ✅ **Fetch latest changes** before committing
- ✅ **Merge or rebase** to handle conflicts
- ✅ **Retry logic** with 3 attempts
- ✅ **Fallback to reset** if merge fails

### 2. **Workflow Files Updated**
- `.github/workflows/ci.yml` - Main CI workflow
- `.github/workflows/security-report.yml` - Security reporting
- `.github/workflows/readme-badges.yml` - Badge updates
- `.github/workflows/resolve-conflicts.yml` - Manual conflict resolution

### 3. **Conflict Resolution Script**
- `scripts/resolve-readme-conflicts.sh` - Manual conflict resolution script

## How It Works

### Automatic Resolution
Each workflow now follows this pattern:

```bash
# Fetch latest changes
git fetch origin master

# Try to merge or rebase
git merge origin/master || git rebase origin/master || git reset --hard origin/master

# Commit changes
git add README.md
git commit -m "📊 Update README with latest CI results [skip ci]"

# Push with retry logic
for i in {1..3}; do
  if git push origin master; then
    echo "Push successful"
    break
  else
    echo "Push attempt $i failed, retrying..."
    git pull origin master --rebase
    sleep 5
  fi
done
```

### Manual Resolution
If conflicts persist, you can:

1. **Run the conflict resolution workflow**:
   - Go to GitHub Actions
   - Find "Resolve README Conflicts" workflow
   - Click "Run workflow"

2. **Use the local script**:
   ```bash
   ./scripts/resolve-readme-conflicts.sh
   ```

3. **Manual git commands**:
   ```bash
   git fetch origin master
   git reset --hard origin/master
   git push origin master
   ```

## Prevention Strategies

### 1. **Workflow Timing**
- Main CI runs on every push
- Security report runs weekly (Monday 9 AM)
- Badge updates run on every push
- Conflict resolution runs every 6 hours

### 2. **Skip CI Commits**
All README update commits use `[skip ci]` to prevent infinite loops:
```bash
git commit -m "📊 Update README with latest CI results [skip ci]"
```

### 3. **Retry Logic**
Each workflow includes retry logic with exponential backoff:
- 3 attempts maximum
- 5-second delay between attempts
- Graceful failure handling

## Monitoring

### Check Workflow Status
1. Go to GitHub Actions tab
2. Look for failed workflows
3. Check the logs for specific error messages

### Common Error Messages
- `Updates were rejected because the remote contains work` - Git conflict
- `Push failed, will retry on next run` - Retry logic activated
- `No changes to commit` - No actual changes to push

## Best Practices

### 1. **Avoid Manual README Edits**
- Let workflows handle README updates automatically
- If manual edits are needed, run conflict resolution afterward

### 2. **Monitor Workflow Health**
- Check GitHub Actions regularly
- Look for recurring failures
- Use the conflict resolution workflow if needed

### 3. **Backup Strategy**
- README changes are automatically committed
- Git history preserves all changes
- Easy to revert if needed

## Troubleshooting

### If Workflows Keep Failing
1. Run the "Resolve README Conflicts" workflow manually
2. Check if there are any syntax errors in the workflows
3. Verify that the repository has proper permissions

### If README Gets Corrupted
1. Check the git history: `git log --oneline README.md`
2. Revert to a previous version: `git checkout <commit-hash> -- README.md`
3. Push the fix: `git push origin master`

### If Badges Stop Updating
1. Check the workflow logs for errors
2. Verify that the security checks are passing
3. Manually trigger the badge update workflow

## Support

If you continue to experience issues:
1. Check the GitHub Actions logs
2. Run the conflict resolution workflow
3. Consider temporarily disabling some workflows
4. Contact the development team for assistance

---

*This documentation is automatically maintained by the workflow system.*
