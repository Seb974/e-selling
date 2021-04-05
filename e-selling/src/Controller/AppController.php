<?php

/**
 * AppController
 *
 * Informations :
 * Default app controller
 *
 * @author Sébastien : sebastien.maillot@coding-academy.fr
 */
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/", name="app")
     * 
     * Informations :
     * Website entrypoint
     */
    public function index(): Response
    {
        return $this->render('app/index.html.twig');
    }
}
