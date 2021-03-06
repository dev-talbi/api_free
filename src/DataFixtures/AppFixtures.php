<?php

namespace App\DataFixtures;

use App\Entity\Review;
use App\Entity\Stories;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * Password encoder (argon2i)
     *
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    // Create 12 user, between 6 and 12 stories, and between 2 and 3 review for one story
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $user = "";

        for ($u = 0; $u < 12; $u++) {
            $user = new User();
            $hash = $this->encoder->encodePassword($user, "password");
            $user->setFirstname($faker->firstName)
                ->setLastname($faker->lastName)
                ->setEmail($faker->safeEmail)
                ->setPhone($faker->phoneNumber)
                ->setPassword($hash);
            $manager->persist($user);
        }

        for ($i = 0; $i < mt_rand(6, 12); $i++) {
            $story = new Stories();
            $story->setStory($faker->text)
                ->setUser($user)
                ->setPicture($faker->imageUrl(400, 400, 'animals', true, 'cat'))
                ->setCreatedAt($faker->dateTimeBetween('-7 months'));
            $manager->persist($story);

            for ($r = 0; $r < mt_rand(2, 3); $r++) {
                $review = new Review();
                $review->setReview($faker->text)
                    ->setStory($story)
                    ->setAuthor($user);
                $manager->persist($review);
            }
        }

        $manager->flush();
    }
}
