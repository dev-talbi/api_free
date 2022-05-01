<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Controller\StoriesPublishController;
use App\Repository\StoriesRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=StoriesRepository::class)
 * @ApiResource(
 *     collectionOperations={
 *     "GET",
 *     "POST",
 *     "post_created_at" = {
 *          "method" : "POST",
 *          "path" : "/post-story",
 *          "controller" : StoriesPublishController::class,
 *     }
 *     },
 *     itemOperations = {
 *     "GET",
 *     "PUT",
 *     "DELETE",
 * },
 *     attributes={
 *     "pagination_enabled"= true,
 *     "order": {"Created_at":"desc"}
 *     },
 *     normalizationContext={
 *     "groups"={"stories_read"}
 *     }
 * )
 * @ApiFilter(OrderFilter::class)
 *
 */
class Stories
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"stories_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"stories_read"})
     * @Assert\NotBlank(message="Story cannot be null")
     */
    private $story;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"stories_read"})
     */
    private $picture;

    /**
     * @ORM\Column(type="date", nullable=false)
     * @Groups({"stories_read"})
     */
    private $Created_at;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups({"stories_read"})
     */
    private $Updated_at;

    /**
     * @ORM\OneToMany(targetEntity=Review::class, mappedBy="story", cascade={"persist", "remove"})
     * @Groups({"stories_read"})
     */
    private $reviews;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="stories", cascade={"persist"} )
     * @Groups({"stories_read"})
     */
    private $user;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStory(): ?string
    {
        return $this->story;
    }

    public function setStory(string $story): self
    {
        $this->story = $story;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->Created_at;
    }

    public function setCreatedAt(?DateTimeInterface $Created_at): self
    {
        $this->Created_at = $Created_at;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeInterface
    {
        return $this->Updated_at;
    }

    public function setUpdatedAt(?DateTimeInterface $Updated_at): self
    {
        $this->Updated_at = $Updated_at;

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setStory($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getStory() === $this) {
                $review->setStory(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

}
