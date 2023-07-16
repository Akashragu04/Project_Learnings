package com.intelizign.dmgcc.services.landingpage;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intelizign.dmgcc.models.landingpage.FeedBackModel;
import com.intelizign.dmgcc.repositories.landingpage.FeedBackRepository;

@Service
public class FeedBackServices {

	@Autowired
	private FeedBackRepository feedbackRepository;

	 static String SHEET = "Sheet1";
	 
	public String feedbackExport() {
		List<FeedBackModel> glGroupingModel = feedbackRepository.findAllByOrderById();
		return feedbackInfoToExcel(glGroupingModel);
	}

	public String customerFeedbackExport(String short_id) {
		List<FeedBackModel> glGroupingModel = feedbackRepository.findByShortId(true,short_id);
		return feedbackInfoToExcel(glGroupingModel);
	}
	
	private String feedbackInfoToExcel(List<FeedBackModel> feedbackDatas) {


		String[] HEADERs = {"Short ID", "Designation Level", "Department", "Project Name", "Project ID", "Cost Center", "Quality Status", "Adherence status", "Quality Timeline Status", "Knowledge Status", "Responsiveness Status", "Communication Skills Status", "Overall Plan Status", "Sustainability Status", "Quality Remark", "Adherence Remark", "Quality Timeline Remark", "Knowledge Remark", "Responsiveness Remark", "Communication Skills Remark", "Overall Plan Remark", "Sustainability Remark", "Recommend Counterpart State", "Recommend Counterpart", "Suggestions Improvement Areas"};

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			// Header
			Row headerRow = sheet.createRow(0);
			CellStyle cellStyle = workbook.createCellStyle();
			for (int col = 0; col < HEADERs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(HEADERs[col]);
				addBold(workbook, cellStyle, cell);
			}

			int rowIdx = 1;
			for (FeedBackModel feedbackData : feedbackDatas) {

				Row row = sheet.createRow(rowIdx);
				row.createCell(0).setCellValue(feedbackData.getShort_id());
				row.createCell(1).setCellValue(feedbackData.getDesignation_level());
				row.createCell(2).setCellValue(feedbackData.getDepartment());
				row.createCell(3).setCellValue(feedbackData.getProject_name());
				row.createCell(4).setCellValue(feedbackData.getProject_id());
				row.createCell(5).setCellValue(feedbackData.getCost_center());
				row.createCell(6).setCellValue(feedbackData.getQuality_status());
				row.createCell(7).setCellValue(feedbackData.getAdherence_status());
				row.createCell(8).setCellValue(feedbackData.getQuality_timeLine_status());
				row.createCell(9).setCellValue(feedbackData.getKnowledge_status());
				row.createCell(10).setCellValue(feedbackData.getResponsiveness_status());
				row.createCell(11).setCellValue(feedbackData.getCommunication_skills_status());
				row.createCell(12).setCellValue(feedbackData.getOverall_plan_status());
				row.createCell(13).setCellValue(feedbackData.getSustainability_status());
				row.createCell(14).setCellValue(feedbackData.getQuality_remark());
				row.createCell(15).setCellValue(feedbackData.getAdherence_remark());
				row.createCell(16).setCellValue(feedbackData.getQuality_timeLine_remark());
				row.createCell(17).setCellValue(feedbackData.getKnowledge_remark());
				row.createCell(18).setCellValue(feedbackData.getResponsiveness_remark());
				row.createCell(19).setCellValue(feedbackData.getResponsiveness_status());
				row.createCell(20).setCellValue(feedbackData.getCommunication_skills_remark());
				row.createCell(21).setCellValue(feedbackData.getOverall_plan_remark());
				row.createCell(21).setCellValue(feedbackData.getSustainability_remark());
				row.createCell(22).setCellValue(feedbackData.getRecommend_counterpart_state());
				row.createCell(23).setCellValue(feedbackData.getRecommend_counterpart());
				row.createCell(24).setCellValue(feedbackData.getSuggestions_improvement_areas());
				
				rowIdx++;
			}
			workbook.write(out);

			String res = Base64.getEncoder().encodeToString(out.toByteArray());
			return res;
		} 
		
		catch (IOException e) {
			return null;
		}
	
	
	}


	private void addBold(Workbook workbook, CellStyle cellStyle, Cell cell) {
		Font font = workbook.createFont();
		font.setBold(true);
		cellStyle.setFont(font);
		cell.setCellStyle(cellStyle);
	}

}
