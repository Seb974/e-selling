<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProductRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 * @ApiResource(
 *      mercure={"private": false}),
 *      denormalizationContext={"disable_type_enforcement"=true},
 *      normalizationContext={
 *          "groups"={"products_read"}
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
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"products_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=120, nullable=true)
     * @Groups({"products_read"})
     * @Assert\NotBlank(message="Un nom est obligatoire.")
     */
    private $name;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"products_read"})
     */
    private $erpCode;

    // @Assert\NotBlank(message="Au moins un prix est obligatoire.")
    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"products_read"})
     */
    private $prices = [];

    /**
     * @ORM\OneToOne(targetEntity=Picture::class, cascade={"persist", "remove"})
     * @Groups({"products_read"})
     */
    private $picture;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"products_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"products_read"})
     */
    private $isAvailable;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"products_read"})
     */
    private $isOnTop;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"products_read"})
     */
    private $isStockManaged;

    /**
     * @ORM\ManyToMany(targetEntity=Category::class, mappedBy="products")
     * @Groups({"products_read"})
     */
    private $categories;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"products_read"})
     */
    private $userGroups = [];

    public function __construct()
    {
        $this->categories = new ArrayCollection();
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

    public function getErpCode(): ?int
    {
        return $this->erpCode;
    }

    public function setErpCode(?int $erpCode): self
    {
        $this->erpCode = $erpCode;

        return $this;
    }

    public function getPrices(): ?array
    {
        return $this->prices;
    }

    public function setPrices(?array $prices): self
    {
        $this->prices = $prices;

        return $this;
    }

    public function getPicture(): ?Picture
    {
        return $this->picture;
    }

    public function setPicture(?Picture $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getIsAvailable(): ?bool
    {
        return $this->isAvailable;
    }

    public function setIsAvailable(?bool $isAvailable): self
    {
        $this->isAvailable = $isAvailable;

        return $this;
    }

    public function getIsOnTop(): ?bool
    {
        return $this->isOnTop;
    }

    public function setIsOnTop(?bool $isOnTop): self
    {
        $this->isOnTop = $isOnTop;

        return $this;
    }

    public function getIsStockManaged(): ?bool
    {
        return $this->isStockManaged;
    }

    public function setIsStockManaged(?bool $isStockManaged): self
    {
        $this->isStockManaged = $isStockManaged;

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
            $category->addProduct($this);
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->removeElement($category)) {
            $category->removeProduct($this);
        }

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
}
