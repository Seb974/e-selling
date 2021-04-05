<?php

namespace App\Service\Mercure;

use App\Entity\User;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\Security\Core\Security;

/**
 * CookieGenerator
 *
 * Informations :
 * This service create with its unique method "generate", the MercureAuthorization cookie.
 * It contains the privates channels that the user given as unique parameter of the function 
 * is subscribed to. 
 * 
 * The subscribed channels selection take care about the user's status (logged in or not) and 
 * the roles is granted to.
 *
 * @author Sébastien : sebastien.maillot@coding-academy.fr
 */
class CookieGenerator
{
    private $key;
    private $config;
    private $security;
    private $domain;
    private $tokenTTL;
    
    public function __construct(string $key, string $domain, string $tokenTTL, Security $security)
    {
        $this->key = $key;
        $this->domain = $domain;
        $this->tokenTTL = $tokenTTL;
        $this->security = $security;
        $this->config = Configuration::forSymmetricSigner(new Sha256(), InMemory::plainText($this->key));
    }

    public function generate(User $user = null) : Cookie 
    {
        $publicChannels = [];
        $id = $user != null ? $user->getId() : 0;

        $teamPrivateChannels = [
            $this->domain . "/api/users/{id}",                      // users updates
            $this->domain . "/api/users/{id}/metas",                // metas users updates
            $this->domain . "/api/users/{id}/shipments",            // shipments updates
            $this->domain . "/api/private",                         // general updates (unused)
        ];

        $selfPrivateChannels = [
            $this->domain . "/api/users/" . $id,                    // self updates
            $this->domain . "/api/users/" . $id . "/metas",         // self metas updates
            $this->domain . "/api/users/" . $id . "/shipments",     // shipments updates
        ];

        $channels = $user == null ? $publicChannels :
            ($this->security->isGranted("ROLE_TEAM") ? $teamPrivateChannels : $selfPrivateChannels);

        $token = $this->config->builder()
                      ->withClaim('mercure', ['subscribe' => $channels])
                      ->getToken(new Sha256(), $this->config->signingKey())
                      ->toString();

        return Cookie::fromString("mercureAuthorization={$token}; Max-Age={$this->tokenTTL}; {$_ENV['MERCURE_COOKIE_CONFIG']}");
    }
}