package com.intelizign.dmgcc.authendication;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AzureTokenResponse {
	private String name;
	private String shortid;
	private String email;
	private String preferred_username;
	private String unique_name;
}
