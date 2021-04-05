<?php

namespace App\Service\Mercure;

use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Configuration;

/**
 * JwtProvider
 *
 * Informations :
 * This invokable class provides to the Mercure Hub dynamics tokens
 * instead of serving the static token originally registered in .env file.
 * 
 * This token allow the Mercure hub to publish on every channels (publics and privates)
 *
 * @author Sébastien : sebastien.maillot@coding-academy.fr
 */
class JwtProvider
{
    private $key;
    private $config;
    
    public function __construct(string $key)
    {
        $this->key = $key;
        $this->config = Configuration::forSymmetricSigner(new Sha256(), InMemory::plainText($this->key));
    }

    public function __invoke()
    {
        $token = $this->config
                      ->builder()
                      ->withClaim('mercure', ['publish' => ['*']])
                      ->getToken(new Sha256(), $this->config->signingKey());
        return $token->toString();
    }
}