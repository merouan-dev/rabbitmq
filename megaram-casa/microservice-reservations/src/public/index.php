<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../../vendor/autoload.php';

$app = AppFactory::create();

// Route pour créer une réservation
$app->post('/api/reservations', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    
    // Validation des données
    if (empty($data['id_film']) || empty($data['id_utilisateur'])) {
        $response->getBody()->write(json_encode(['error' => 'Données manquantes']));
        return $response->withStatus(400);
    }
    
    // Ici, vous devriez enregistrer en base de données
    // Exemple simplifié:
    $reservation = [
        'id' => uniqid(),
        'id_film' => $data['id_film'],
        'id_utilisateur' => $data['id_utilisateur'],
        'date_reservation' => date('Y-m-d H:i:s')
    ];
    
    $response->getBody()->write(json_encode($reservation));
    return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
});

$app->run();
