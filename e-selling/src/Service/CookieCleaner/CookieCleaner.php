<?php

namespace App\Service\CookieCleaner;

use Symfony\Component\HttpFoundation\Response;

/**
 * CookieCleaner
 *
 * Informations :
 * This service add with its unique method the convenient headers 
 * to remove the authentication cookies in browser.
 *
 * @author Sébastien : sebastien.maillot@coding-academy.fr
 */
class CookieCleaner
{
    private $mercurePath;

    public function __construct(string $mercurePath)
    {
        $this->mercurePath = $mercurePath;
    }

    public function addClearHeaders(Response $response) : Response
    {
        $response->headers->clearCookie('BEARER', '/', null);
        $response->headers->clearCookie('mercureAuthorization', $this->mercurePath, null);
        return $response;
    }
}