package xyz.mendesoft.controller;



import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.mendesoft.dto.MenuDTO;
import xyz.mendesoft.model.Menu;
import xyz.mendesoft.service.IMenuService;

import java.util.List;

@RestController
@RequestMapping("/menus")
@RequiredArgsConstructor
public class MenuController {

    private final IMenuService service;

    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    @PostMapping("/user")
    public ResponseEntity<List<MenuDTO>> getMenusByUser(@RequestBody String username) throws Exception {
        List<Menu> menus = service.getMenusByUsername(username);
        List<MenuDTO> menusDTO = menus.stream().map(e -> modelMapper.map(e, MenuDTO.class)).toList();

        return new ResponseEntity<>(menusDTO, HttpStatus.OK);
    }
}
