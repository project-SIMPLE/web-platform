echo "Installing node.js packages..."
npm install
echo "Packages installed !"
open "http://localhost:8005"
echo "Launching Gama Server Middleware..."
node index.js
read -p "Press enter to quit..."



