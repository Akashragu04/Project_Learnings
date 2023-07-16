package com.intelizign.dmgcc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.authendication.UserDetailsImpl;
import com.intelizign.dmgcc.models.G3CEmployeeMasterModel;
import com.intelizign.dmgcc.repositories.G3CEmployeeRepository;
import com.intelizign.dmgcc.repositories.RoleRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	G3CEmployeeRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		G3CEmployeeMasterModel user = userRepository.findUserByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return UserDetailsImpl.build(user);
	}

//	@Override
//	@Transactional
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		G3CEmployeeMasterModel user = userRepository.findUserByEmail(email)
//				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));
//
//		return UserDetailsImpl.build(user);
//	}

//  @Override
//  @Transactional
//  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//    G3CEmployeeMasterModel user = userRepository.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + username));
//   
//    return UserDetailsImpl.build(user);
//  }

//  @Transactional
//  public UserDetails loadUserByUsername(G3CLoginRequest loginRequest) throws UsernameNotFoundException {
//    Optional<G3CEmployeeMasterModel> userdata = userRepository.findUserByEmail(loginRequest.getEmail());
//    G3CEmployeeMasterModel user=new G3CEmployeeMasterModel();
//    if(userdata.isPresent()) {
//    	user=userdata.get();
//    }else {
//    	user=saveUserAsCustomer(loginRequest);
//    }
//    return UserDetailsImpl.build(user);
//  }

//  private G3CEmployeeMasterModel saveUserAsCustomer(G3CLoginRequest loginRequest) {
//	  G3CEmployeeMasterModel user=new G3CEmployeeMasterModel(loginRequest.getShortid(), loginRequest.getEmpname(), loginRequest.getEmail());
//	  Set<Role> roles = new HashSet<>();
//	  Role cusRole = roleRepository.findByName(ERole.CUSTOMER)
//				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//		roles.add(cusRole);
//		user.setRolename(cusRole.getName().toString());
//		
//	  return userRepository.save(user);
//  }

}