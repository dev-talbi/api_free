<?php


namespace App\Service;


use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtUpdate
{
    // Function called in "services.yaml, Add firstname, lastname, phone and user id in the token"
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