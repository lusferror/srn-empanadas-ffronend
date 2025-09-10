FROM php:8.2-apache

RUN apt-get update \
	&& apt-get install -y unzip curl libicu-dev \
	&& docker-php-ext-install mysqli intl \
	&& curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


COPY . /var/www/html/application


RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/application/public|g' /etc/apache2/sites-available/000-default.conf \
&& sed -i 's|<Directory /var/www/html>|<Directory /var/www/html/application/public>|g' /etc/apache2/apache2.conf

RUN chown -R www-data:www-data /var/www/html/application \
&& chmod -R 755 /var/www/html/application

RUN cd /var/www/html/application && composer install

EXPOSE 8080
