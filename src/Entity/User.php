<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(
 *     collectionOperations={"GET", "POST"},
 *     itemOperations={"GET", "PUT"},
 *     normalizationContext={
 *     "groups"={"user_read"}
 *     }
 * )
 * @ApiFilter(SearchFilter::class, properties={"Firstname":"partial", "Lastname":"partial", "email":"partial"})
 * @UniqueEntity("email", message="This email already exist")
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user_read", "stories_read", "review_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user_read"})
     * @Assert\NotBlank(message="User email cannot be null")
     * @Assert\Email(message="The email '{{ value }}' is not a valid email.")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user_read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="User password cannot be null")
     * @Assert\Regex(
     *     pattern =  "/^(?=.*\d)(?=.*[A-Z])(?=.*[@#$%])(?!.*(.)\1{2}).*[a-z]/m",
     *     match=true,
     *     message="The password must contain minimum eight characters, at least one letter, one number and one special caracter"
     * )
     * @Assert\Length(
     *     min= 8,
     *     minMessage="The password must contain minimum eight characters, at least one letter, one number, one uppercase and one special caracter"
     * )
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "stories_read", "review_read"})
     * @Assert\NotBlank(message="User firstname cannot be null")
     * @Assert\Length(
     *     min = 2,
     *     max = 50,
     *     minMessage="Your first name must be at least {{ limit }} characters long",
     *     maxMessage="Your first name cannot be longer than {{ limit }} characters"
     * )
     */
    private $Firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read", "stories_read", "review_read"})
     * @Assert\Length(
     *     min = 2,
     *     max = 50,
     *     minMessage="Your last name must be at least {{ limit }} characters long",
     *     maxMessage="Your last name cannot be longer than {{ limit }} characters"
     * )
     */
    private $Lastname;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_read"})
     * @Assert\Length(
     *     min = 0,
     *     max= 10,
     *     minMessage="Please enter a valid phone number",
     *     maxMessage="Please enter a valid phone number"
     *
     * )
     * @Assert\Regex(
     *     pattern =  "/^(\s*|\d+)$/",
     *     match=true,
     *     message="Please enter a valid phone number"
     * )
     */
    private $Phone;

    /**
     * @ORM\OneToMany(targetEntity=Stories::class, mappedBy="user")
     * @Groups({"user_read"})
     * @ApiSubresource()
     */
    private $stories;

    /**
     * @ORM\OneToMany(targetEntity=Review::class, mappedBy="author")
     * @Groups({"user_read"})
     */
    private $reviews;

    public function __construct()
    {
        $this->stories = new ArrayCollection();
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string)$this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string)$this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->Firstname;
    }

    public function setFirstname(string $Firstname): self
    {
        $this->Firstname = $Firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->Lastname;
    }

    public function setLastname(string $Lastname): self
    {
        $this->Lastname = $Lastname;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->Phone;
    }

    public function setPhone(?string $Phone): self
    {
        $this->Phone = $Phone;

        return $this;
    }

    /**
     * @return Collection<int, Stories>
     */
    public function getStories(): Collection
    {
        return $this->stories;
    }

    public function addStory(Stories $story): self
    {
        if (!$this->stories->contains($story)) {
            $this->stories[] = $story;
            $story->setUser($this);
        }

        return $this;
    }

    public function removeStory(Stories $story): self
    {
        if ($this->stories->removeElement($story)) {
            // set the owning side to null (unless already changed)
            if ($story->getUser() === $this) {
                $story->setUser(null);
            }
        }

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
            $review->setAuthor($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getAuthor() === $this) {
                $review->setAuthor(null);
            }
        }

        return $this;
    }
}
