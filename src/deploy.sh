echo "starting deployment..."

echo "building app..."
npm run build

echo "copying files to server..."
scp -r dist/* jordan@192.168.2.247:/var/www/configs-ui

echo "application deployed successfully!"
echo "starting server..."

echo "DONE!"