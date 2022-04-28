<?php

namespace App\Entity;

use App\Repository\ReviewRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ReviewRepository::class)
 * @ApiResource(
 *     collectionOperations={"GET", "POST"},
 *     itemOperations={"GET", "PUT", "DELETE"},
 *     normalizationContext={
 *     "groups"={"review_read"}
 *     }
 * )
 */
class Review
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"review_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"review_read"})
     */
    private $review;

    /**
     * @ORM\ManyToOne(targetEntity=Stories::class, inversedBy="reviews" )
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"review_read"})
     */
    private $story;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="reviews")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"review_read"})
     */
    private $author;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReview(): ?string
    {
        return $this->review;
    }

    public function setReview(string $review): self
    {
        $this->review = $review;

        return $this;
    }

    public function getStory(): ?Stories
    {
        return $this->story;
    }

    public function setStory(?Stories $story): self
    {
        $this->story = $story;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }
}
