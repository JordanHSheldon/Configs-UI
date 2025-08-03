echo "starting deployment..."

echo "building app..."
npm run build

echo "copying files to server..."
scp -r dist/* jsheldon@192.168.40.93:/var/www/192.168.40.93

echo "application deployed successfully!"
echo "starting server..."

echo "DONE!"