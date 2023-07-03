package com.pearling.web.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pearling.web.entity.DiaryComment;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.DiaryCommentService;

@RestController("apiDiaryCommentController")
@RequestMapping("/api/diaryComments")
public class DiaryCommentController {

	@Autowired
	private DiaryCommentService service;

	@GetMapping("{diaryId}")
	public List<DiaryComment> list(
		@PathVariable("diaryId") Integer diaryId,
		@AuthenticationPrincipal MyUserDetails user) {

			Integer memberId = null;
	
			if (user != null) {
				memberId = user.getId();
			}
		List<DiaryComment> diaryComment = service.getList(diaryId);

		System.out.println("나는 다이어리 코멘트 겟요청 레스트컨트롤러지롱");

		return diaryComment;
	}

	@GetMapping("count")
	public int count(@RequestParam("dr") int diaryId) {

		int result = service.getCountByDiary(diaryId);

		return result;
	}

	@PostMapping(consumes = "application/json", produces = "application/json")
	public void post(@RequestBody DiaryComment diaryComment) {

		service.append(diaryComment);
		System.out.println("나는 다이어리 포스트요청 레스트컨트롤러지롱");
	}

	@DeleteMapping("/{id}/members/{memberId}")
	public void delete(@PathVariable("id") Integer id,
			@PathVariable("memberId") Integer memberId) {

			service.delete(id);

			System.out.println("나는 다이어리 딜리트요청 레스트컨트롤러지롱");
	}

	@PutMapping("{id}/members/{memberId}")
	public void update(@PathVariable("id") Integer id,
			@PathVariable("memberId") Integer regMemberId,
			@RequestBody DiaryComment diaryComment) {

			service.update(diaryComment);
			System.out.println("나는 다이어리 업데이트요청 레스트컨트롤러지롱");

	}

// }
}