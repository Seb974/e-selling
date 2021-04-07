<?php

namespace App\Service\JwtAuthentication;

use Symfony\Component\HttpFoundation\Cookie;

/**
 * CookieGenerator
 *
 * Informations :
 * This service create with its unique method "generate", the BEARER cookie, 
 * used for authentication with API PLATFORM.
 *
 * @author Sébastien : sebastien.maillot@coding-academy.fr
 */
class CookieGenerator
{
    private $tokenTTL;
    
    public function __construct(string $tokenTTL)
    {
        $this->tokenTTL = $tokenTTL;
    }

    public function generate($token) : Cookie 
    {
        $expire = (new \DateTime())->add(new \DateInterval('PT' . $this->tokenTTL . 'S'));
        return Cookie::create('BEARER')
                    ->withValue($token)
                    ->withDomain(null)
                    ->withPath('/')
                    ->withSecure(true)
                    ->withHttpOnly(true)
                    ->withSameSite('lax')
                    ->withExpires($expire);
    }
}