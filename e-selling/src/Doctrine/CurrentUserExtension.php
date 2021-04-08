<?php

namespace App\Doctrine;

use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\Category;
use App\Entity\Product;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;
    private $auth;

    public function __construct(Security $security, AuthorizationCheckerInterface $auth)
    {
        $this->security = $security;
        $this->auth = $auth;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        $user = $this->security->getUser();
        $entityNeedingUser = [];
        $entityNeedingRole = [Category::class, Product::class];

        if (!$this->auth->isGranted('ROLE_ADMIN') && $user instanceof User) {
            if (in_array($resourceClass, $entityNeedingUser)) {
                $rootAlias = $queryBuilder->getRootAliases()[0];
                $queryBuilder->andWhere("$rootAlias.user = :user")
                             ->setParameter("user", $user);
            }
            if (in_array($resourceClass, $entityNeedingRole)) {
                $role = $this->getMainRole();
                $rootAlias = $queryBuilder->getRootAliases()[0];
                $queryBuilder->andWhere("$rootAlias.userGroups LIKE :role")
                             ->setParameter("role", '%' . $role . '%');
            }

        }
    }

    private function getMainRole()
    {
        return  $this->auth->isGranted('ROLE_SUPER_ADMIN') ? 'ROLE_SUPER_ADMIN' :
               ($this->auth->isGranted('ROLE_ADMIN') ? 'ROLE_ADMIN' :
               ($this->auth->isGranted('ROLE_TEAM') ? 'ROLE_TEAM' :
               ($this->auth->isGranted('ROLE_VIP') ? 'ROLE_VIP' :
               ($this->auth->isGranted('ROLE_GC') ? 'ROLE_GC' :
               ($this->auth->isGranted('ROLE_CHR') ? 'ROLE_CHR' :
               ($this->auth->isGranted('ROLE_PRO') ? 'ROLE_PRO' :
               ($this->auth->isGranted('ROLE_USER_EXT_VIP') ? 'ROLE_USER_EXT_VIP' :
               ($this->auth->isGranted('ROLE_USER_VIP') ? 'ROLE_USER_VIP' :
               ($this->auth->isGranted('ROLE_USER_EXT') ? 'ROLE_USER_EXT' : 'ROLE_USER')))))))));
    }
}