package xyz.mendesoft.service;


import xyz.mendesoft.model.Menu;

import java.util.List;

public interface IMenuService extends ICRUD<Menu, Integer> {

    List<Menu> getMenusByUsername(String username);

}
