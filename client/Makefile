update-client:
# Lado cliente
	pnpm install
	pnpm run build
	sudo rm -rf /var/www/html
	sudo mv dist /var/www/html
	sudo service nginx restart