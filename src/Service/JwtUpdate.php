<?php


namespace App\Service;


use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtUpdate
{
    // function called in "services.yaml"
    public function updateJwtToken(JWTCreatedEvent $event)
    {
        /** @var User $user */
        $user = $event->getUser();
        $data = $event->getData();

        // set user data in the jwt token
        $data['firstname'] = $user->getFirstname();
        $data['lastname'] = $user->getLastname();
        $data['phone'] = $user->getPhone();
        $data['id'] = $user->getId();
        $event->setData($data);


    }

}