<?php


namespace App\EventListener;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Stories;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class DeleteAndEditStoryListener implements EventSubscriberInterface
{

    /** @var TokenStorageInterface */
    private $tokenStorage;

    /**
     * @param TokenStorageInterface $storage
     */
    public function __construct(
        TokenStorageInterface $storage
    ) {
        $this->tokenStorage = $storage;
    }

    public static function getSubscribedEvents()
    {
        // call the function onDeleteAction before register a user
        return [KernelEvents::VIEW => ['onDeleteAction', EventPriorities::PRE_WRITE]];
    }

    public function onDeleteAction(ViewEvent $event)
    {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $token = $this->tokenStorage->getToken();
        $user = $token->getUser();

        if ($result instanceof Stories && $method === "DELETE" || $method === "PUT") {

            if ($user->getId() != $result->getUser()->getId()) {
                $event->stopPropagation();
            }

        }
    }

}