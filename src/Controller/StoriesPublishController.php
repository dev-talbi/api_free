<?php


namespace App\Controller;


use App\Entity\Stories;
use DateTime;
use Exception;

class StoriesPublishController
{

    // Set Created_at on Stories entity when you use "/api/post-story"
    public function __invoke(Stories $data): Stories
    {
        try {
            $date = new DateTime("now");
            $data->setCreatedAt($date);

            return $data;
        } catch (Exception $e) {
            dd($e);
        }
    }

}