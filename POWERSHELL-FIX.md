# PowerShell Execution Policy Fix

If you're experiencing issues with running npm commands in PowerShell due to execution policy restrictions, you can try the following solutions:

## Option 1: Run the batch file

Run the `install-remixicon.bat` file by double-clicking it in Windows Explorer. This bypasses the PowerShell execution policy.

## Option 2: Change PowerShell execution policy temporarily

1. Start PowerShell as Administrator
2. Run the following command:
   ```
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   ```
3. Now you can run npm commands in the current session
4. The policy will revert when you close PowerShell

## Option 3: Use Command Prompt instead

1. Open Command Prompt (cmd.exe)
2. Navigate to your project directory:
   ```
   cd "C:\Users\ELITE\Desktop\Class Files\WCT\food-planner"
   ```
3. Run npm commands:
   ```
   npm install remixicon --save
   ```

## Option 4: Use VSCode integrated terminal

VSCode's integrated terminal sometimes has different execution policy settings. Try running your commands there.

## Note about fallback icons

The application includes a fallback CSS file for Remixicon, so even if the package isn't installed, you should still see icons (though they might look different).
