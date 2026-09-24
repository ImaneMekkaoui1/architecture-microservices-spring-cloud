package net.mekkaoui.billingservice.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductItemRequestDTO {
    private Long productId;
    private int quantity;
}