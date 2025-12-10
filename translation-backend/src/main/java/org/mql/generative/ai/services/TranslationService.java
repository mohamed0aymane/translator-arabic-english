package org.mql.generative.ai.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class TranslationService {

    @Value("${gemini.api.key}")
    private String apiKey;
    
    @Value("${gemini.api.url}")
    private String apiUrl;

    //Create an HTTP client to send requests to the Gemini API
    private static final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    private static final ObjectMapper mapper = new ObjectMapper();

    public String translate(String text) {
        try {
        	String url = apiUrl + "?key=" + apiKey;

            String payload = """
                    {
                        "contents": [{
                            "parts": [{
                                "text": "Translate this text from English to Moroccan Darija. Return ONLY the translation: %s"
                            }]
                        }]
                    }
                    """.formatted(text);

            //Sending the Request to Gemini
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(payload))
                    .build();
            
            
            
            //This sends a POST request to Gemini and receives a JSON response.
            HttpResponse<String> response =
                    http.send(request, HttpResponse.BodyHandlers.ofString());

            
            // Check API errors
            JsonNode json = mapper.readTree(response.body());
            if (json.has("error")) {
                return "Gemini API Error: " + json.get("error").get("message").asText();
            }

            
            JsonNode candidates = json.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                return "Invalid Gemini response: " + response.body();
            }
            

            //Your code extracts:
            JsonNode textNode = candidates.get(0)
                    .get("content")
                    .get("parts")
                    .get(0)
                    .get("text");
            //Clean responses gemini responses :
            String cleanText = textNode.asText()
            .replace("\n", "")   
            .replace("\r", "")   
            .trim();  

            return cleanText;


        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
            
}
