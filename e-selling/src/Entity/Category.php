<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 * @ApiResource(
 *      mercure={"private": false}),
 *      denormalizationContext={"disable_type_enforcement"=true},
 *      normalizationContext={
 *          "groups"={"categories_read"}
 *      },
 *      collectionOperations={
 *          "GET",
 *          "POST"={"security"="is_granted('ROLE_ADMIN')"},
 *      },
 *      itemOperations={
 *          "GET",
 *          "PUT"={"security"="is_granted('ROLE_ADMIN')"},
 *          "PATCH"={"security"="is_granted('ROLE_ADMIN')"},
 *          "DELETE"={"security"="is_granted('ROLE_ADMIN')"},
 *      }
 * )
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"categories_read", "products_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=120, nullable=true)
     * @Groups({"categories_read", "products_read"})
     * @Assert\Length(min = 3, minMessage = "Le mot de passe doit contenir au moins {{ limit }} caractères.", max = 120, maxMessage = "Le nom d'une catégorie ne peut excéder {{ limit }} caractères.")
     */
    private $name;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"categories_read", "products_read"})
     */
    private $userGroups = [];

    /**
     * @ORM\ManyToMany(targetEntity=Product::class, inversedBy="categories")
     * @Groups({"categories_read"})
     */
    private $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUserGroups(): ?array
    {
        return $this->userGroups;
    }

    public function setUserGroups(?array $userGroups): self
    {
        $this->userGroups = $userGroups;

        return $this;
    }

    /**
     * @return Collection|Product[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        $this->products->removeElement($product);

        return $this;
    }
}
