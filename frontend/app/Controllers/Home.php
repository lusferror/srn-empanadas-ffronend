<?php

namespace App\Controllers;

use Config\Services;

class Home extends BaseController
{
    public function index(): string
    {
        $username = env('BASIC_AUTH_USER');
        $password = env('BASIC_AUTH_PASSWORD');
        $client = Services::curlrequest();
        $response = $client->get('backend:3000/api/empanadas', [
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode("$username:$password")
            ]
        ]);
        $data = json_decode($response->getBody(), true);
        return view('welcome_message', ['empanadas' => $data['empanadas']]);
    }
}
