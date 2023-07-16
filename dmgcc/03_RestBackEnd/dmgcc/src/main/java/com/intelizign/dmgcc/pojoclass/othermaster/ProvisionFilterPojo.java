package com.intelizign.dmgcc.pojoclass.othermaster;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProvisionFilterPojo {

	private String month;
	private String year;
	private String status;
	private String costcenter;
	
}
