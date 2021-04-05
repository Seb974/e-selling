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
    private $secure;
    private $httpOnly;
    
    public function __construct(string $tokenTTL, bool $secure)
    {
        $this->httpOnly = true;
        $this->secure = $secure;
        $this->tokenTTL = $tokenTTL;
    }

    public function generate($token) : Cookie 
    {
        $expire = (new \DateTime())->add(new \DateInterval('PT' . $this->tokenTTL . 'S'));
        
        return new Cookie(
            "BEARER",               // name
            $token,                 // value
            $expire,                // expire
            '/',                    // path
            null,                   // domain (null let Symfony put the right domain)
            $this->secure,          // secure
            $this->httpOnly,        // httpOnly
            false,                  // raw
            'lax'                   // sameSite
        );
    }
}