# secure-home-solutions-website

zip -r myproject_backup_$(date +%F).zip . -x "node_modules/*"

rm myproject_backup_*.zip


optional
#!/bin/bash
zip -r myproject_backup_$(date +%F).zip . -x "node_modules/*"
echo "Backup ready! Download it from the file explorer."
