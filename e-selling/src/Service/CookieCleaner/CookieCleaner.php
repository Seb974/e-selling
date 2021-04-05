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
    public function addClearHeaders(Response $response) : Response
    {
        $response->headers->clearCookie('BEARER', '/', null);
        $response->headers->clearCookie('mercureAuthorization', '/', null);
        return $response;
    }
}