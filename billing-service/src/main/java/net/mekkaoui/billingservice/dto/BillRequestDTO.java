package net.mekkaoui.billingservice.dto;

import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BillRequestDTO {
    private Long customerId;
    private List<ProductItemRequestDTO> productItems;
}