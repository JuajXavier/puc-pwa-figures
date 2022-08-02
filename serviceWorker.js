'use strict';

const CACHE_NAME = 'figure-app-estatico';

const FILES_TO_CACHE = [

    'css/bootstrap.min.css',
    'css/styles.css',
    'images/favicon.ico',
    'icons/144.png',
    'images/logo.png',
    'images/bg001.jpg',
    'images/bg002.jpg',
    'images/cat-icon.png',
    'js/app.js',
    'js/bootstrap.bundle.min.js',
    'offline.html'

];

//Instalação do service worker

self.addEventListener('install', (event) => {
    console.log('Service Worker em instalação');

    event.waitUntil(

        // Verifica se existe o cache_name e aí adiciona os arquivos do files to cache nele.
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker está adicionando o cache estático.');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Ativando o SW

self.addEventListener('activate', (event) => {
    console.log('Service Worker em ativação');

    event.waitUntil(
        caches.keys().then((keylist) => {
            return Promise.all(keylist.map((key) => {
                if(key !== CACHE_NAME) {
                    caches.delete(key); 
                }
            }))
        })
    )
    // Propagar pra todos os usuários que tem esse SW instalado.
    self.clients.claim();
});