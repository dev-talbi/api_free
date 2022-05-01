<?php


namespace App\Controller;


use App\Entity\Stories;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Request;

class StoriesPublishController
{

    public function __invoke(Stories $data ): Stories
    {
        try {
            $date = New \DateTime("now");
            $data->setCreatedAt($date);

           return $data;

        } catch (\Exception $e) {
            dd($e);
        }
    }

}