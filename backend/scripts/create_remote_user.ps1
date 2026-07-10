# PowerShell script to create a MySQL user and grant remote access
# Usage: Open PowerShell as Administrator and run this script (edit variables below)

$mysqlExe = '"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"'
$adminUser = 'root'
# Change password for the new app user below
$appUser = 'smart_user'
$appPass = 'SmartP@ssw0rd!'
$dbName = 'smart_harvest'
$host = '%'

$createUserSql = "CREATE USER IF NOT EXISTS '$appUser'@'$host' IDENTIFIED BY '$appPass'; GRANT ALL PRIVILEGES ON `$dbName`.* TO '$appUser'@'$host'; FLUSH PRIVILEGES;"

Write-Host "Creating user $appUser@${host} and granting privileges on $dbName"
& $mysqlExe -u $adminUser -e $createUserSql
Write-Host "Done. Update backend/.env DATABASE_URL to use $appUser and the password. Encode special chars in the password (e.g. @ -> %40)."