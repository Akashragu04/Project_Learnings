package com.intelizign.dmgcc.services.othermaster;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.intelizign.dmgcc.models.othermaster.GLGroupingModel;
import com.intelizign.dmgcc.repositories.othermaster.GLGroupingRepository;

@Service
public class GLGroupingService {
	
	@Autowired
	private GLGroupingRepository glGroupingRepository;

	 static String SHEET = "Sheet1";
	 
	public ByteArrayInputStream glgroupingExport() {
		List<GLGroupingModel> glGroupingModel = glGroupingRepository.findAllByOrderById();
		return glgroupingInfoToExcel(glGroupingModel);
	}

	private ByteArrayInputStream glgroupingInfoToExcel(List<GLGroupingModel> glGroupingModel) {


		String[] HEADERs = {"GL", "GL description", "GL grouping"};

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
			for (GLGroupingModel glgrouping : glGroupingModel) {

				Row row = sheet.createRow(rowIdx);
				row.createCell(0).setCellValue(glgrouping.getGlcode());
				row.createCell(1).setCellValue(glgrouping.getGl_description());
				row.createCell(2).setCellValue(glgrouping.getGl_grouping());		
				rowIdx++;
			}
			workbook.write(out);

			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			return null;
		}
	
	
	}


	private void addBold(Workbook workbook, CellStyle cellStyle, Cell cell) {
		Font font = workbook.createFont();
		font.setBold(true);
		cellStyle.setFont(font);
		cell.setCellStyle(cellStyle);
	}

	public void save(MultipartFile file) {
	    try {
	      List<GLGroupingModel> glGroupingModel = excelToTutorials(file.getInputStream());
	      glGroupingRepository.saveAll(glGroupingModel);
	    } catch (IOException e) {
	      throw new RuntimeException("fail to store excel data: " + e.getMessage());
	    }
	  }

	public static List<GLGroupingModel> excelToTutorials(InputStream is) {
	    try {
	      Workbook workbook = new XSSFWorkbook(is);

	      Sheet sheet = workbook.getSheet(SHEET);
	      Iterator<Row> rows = sheet.iterator();

	      List<GLGroupingModel> glGroupingModels = new ArrayList<GLGroupingModel>();

	      int rowNumber = 0;
	      while (rows.hasNext()) {
	        Row currentRow = rows.next();

	        // skip header
	        if (rowNumber == 0) {
	          rowNumber++;
	          continue;
	        }

	        Iterator<Cell> cellsInRow = currentRow.iterator();

	        GLGroupingModel glGroupingModel = new GLGroupingModel();

	        int cellIdx = 0;
	        while (cellsInRow.hasNext()) {
	          Cell currentCell = cellsInRow.next();

	          switch (cellIdx) {
	          case 0:
	        	  glGroupingModel.setGlcode((long) currentCell.getNumericCellValue());
	            break;

	          case 1:
	        	  glGroupingModel.setGl_description(currentCell.getStringCellValue());
	            break;

	          case 2:
	        	  glGroupingModel.setGl_grouping(currentCell.getStringCellValue());
	            break;

	          default:
	            break;
	          }

	          cellIdx++;
	        }

	        glGroupingModels.add(glGroupingModel);
	      }
	      workbook.close();
	      return glGroupingModels;
	    } catch (IOException e) {
	      throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
	    }
	  }

	public List<String> sortHeaderColumns(MultipartFile file, String sHEET) {
		List<String> RequestHeader = new ArrayList<>();
		
		Workbook workbook;
		Sheet sheet = null;
		try {
			workbook = new XSSFWorkbook(file.getInputStream());
			  sheet = workbook.getSheet(sHEET);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	     
	      
	      String testheader = sheet.getHeader().toString();
	      System.out.println(testheader);
	      Row header_row = sheet.getRow(0);
	      Iterator<Cell> cellsInRow = header_row.iterator();
	      while (cellsInRow.hasNext()) {
	    	  Cell currentCell = cellsInRow.next();
	    	  RequestHeader.add(currentCell.getStringCellValue());
	    
	      }
		return RequestHeader;
	}


}
