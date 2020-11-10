import { Component, OnInit } from '@angular/core';
import {ReportesService} from './../../services/reportes.service'
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private reportesService:ReportesService) { }
  activeMeGusta = false
  activeNoMeGusta = false 
  activeCmasC = false 
  activeCmenosC = false 
  activePub = false 
  activePaises = false 

  listas:any = []
  ngOnInit(): void {
  }

  topMegusta(){
    this.activeMeGusta = true; 
    this.activeNoMeGusta = false 
    this.activeCmasC = false 
    this.activeCmenosC = false 
    this.activePub = false 
    this.activePaises = false 

    this.reportesService.topLike().subscribe(
      res=>{
        console.log(res)
        this.listas = res
      },
      err=>console.log(err)
    )

  }
  topNoMegusta(){
    this.activeMeGusta = false; 
    this.activeNoMeGusta = true 
    this.activeCmasC = false 
    this.activeCmenosC = false 
    this.activePub = false 
    this.activePaises = false 

    this.reportesService.topDislike().subscribe(
      res=>{
        console.log(res)
        this.listas = res
      },
      err=>console.log(err)
    )

  }

  topCmasC(){
    this.activeMeGusta = false; 
    this.activeNoMeGusta = false 
    this.activeCmasC = true 
    this.activeCmenosC = false 
    this.activePub = false 
    this.activePaises = false 

    this.reportesService.topClienteMasCredito().subscribe(
      res=>{
        console.log(res)
        this.listas = res
      },
      err=>console.log(err)
    )

  }

  topCmenosC(){
    this.activeMeGusta = false; 
    this.activeNoMeGusta = false 
    this.activeCmasC = false 
    this.activeCmenosC = true 
    this.activePub = false 
    this.activePaises = false 

    this.reportesService.topClienteMenosCredito().subscribe(
      res=>{
        console.log(res)
        this.listas = res
      },
      err=>console.log(err)
    )

  }

  topPub(){
    this.activeMeGusta = false; 
    this.activeNoMeGusta = false 
    this.activeCmasC = false 
    this.activeCmenosC = false 
    this.activePub = true 
    this.activePaises = false 

    this.reportesService.topClientePublicacion().subscribe(
      res=>{
        console.log(res)
        this.listas = res
      },
      err=>console.log(err)
    )

  }

  topPaises(){
    this.activeMeGusta = false; 
    this.activeNoMeGusta = false 
    this.activeCmasC = false 
    this.activeCmenosC = false 
    this.activePub = false 
    this.activePaises = true 

    this.reportesService.topPaises().subscribe(
      res=>{
        console.log(res)
        this.listas = res
      },
      err=>console.log(err)
    )

  }

}
