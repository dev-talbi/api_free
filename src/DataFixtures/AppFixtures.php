<?php

namespace App\DataFixtures;

use App\Entity\Review;
use App\Entity\Stories;
use App\Entity\Users;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for ($u = 0; $u < 30; $u++){
            $user = new Users();
            $user->setFirstname($faker->firstName);
            $user->setLastname($faker->lastName);
            $user->setEmail($faker->safeEmail);
            $user->setPhone($faker->phoneNumber);

            $manager->persist($user);

            for ($i = 0; $i < mt_rand(6,12); $i++){
                $story = new Stories();
                $story->setStory($faker->text);
                $story->setAuthor($user);
                $story->setCreatedAt($faker->dateTimeBetween('-7 months'));

                $manager->persist($story);
            }

            for ($j = 0; $j < mt_rand(1,5); $j++ ){
                $review = new Review();
                $review->setReview($faker->text);
                $review->setStory($story);
                $review->setAuthor($user);

                $manager->persist($review);

            }

        }

        $manager->flush();
    }
}
