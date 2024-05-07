use actix_cors::Cors;
use actix_web::{error, web, App, HttpServer, Result};
use siws::message::{SiwsMessage, ValidateOptions};
use siws::output::SiwsOutput;
use time::OffsetDateTime;

async fn validate_and_verify(output: web::Json<SiwsOutput>) -> Result<String> {
    // Read the message from output.signed_message
    let message = SiwsMessage::try_from(&output.signed_message).map_err(error::ErrorBadRequest)?;

    println!("SIWS Message:\n{}", message);

    // Validate the message
    message
        .validate(ValidateOptions {
            domain: Some("localhost:3000".into()),
            nonce: Some("1337nonce".into()), // Ensure nonce is 1337nonce
            time: Some(OffsetDateTime::now_utc()),
        })
        .map_err(error::ErrorBadRequest)?;

    output.verify().map_err(error::ErrorBadRequest)?;

    Ok(String::from("Successfully verified!"))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::permissive();
        App::new()
            .wrap(cors)
            .route("/", web::post().to(validate_and_verify))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
