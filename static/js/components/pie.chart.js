var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Input, Attribute, ElementRef, Inject } from '@angular/core';
import * as d3 from 'd3';
export let PieChart = class {
    constructor(elementRef, width, height, title) {
        this.title = title;
        this.color = d3.scale.category20();
        this.elementRef = elementRef;
        this.width = width;
        this.height = height;
        // console.log('width=' + width + 'height=' + height);
    }
    render(newValue) {
        if (!newValue)
            return;
        var self = this;
        var tot = 0;
        $.each(self.data, (index, item) => {
            tot += item.value;
            item.pos = index;
        });
        var chartContainer = $(this.elementRef.nativeElement).find('.chart-container');
        $(chartContainer).empty();
        var el = chartContainer[0];
        //console.log('rendering');
        var graph = d3.select(el);
        let r = (this.height / 2) - 50;
        let svgWidth = parseInt(self.width) - 40;
        let svgHeight = parseInt(self.height) - 40;
        this.divs = graph
            .append("svg:svg")
            .data([self.data])
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")");
        var pie = d3.layout.pie().value(function (d) {
            return d.value;
        });
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = this.divs.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
        arcs.append("svg:path")
            .attr("fill", function (d, i) {
            return self.color(i);
        })
            .attr("d", function (d) {
            // log the result of the arc generator to show how cool it is :)
            // console.log(arc(d));
            return arc(d);
        })
            .attr("data-legend", function (d) {
            return d.data.label;
        })
            .attr("data-legend-pos", function (d) {
            return d.data.pos;
        })
            .classed("slice", true);
        // add the text
        arcs.append("svg:text").attr("transform", function (d) {
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";
        }).attr("text-anchor", "middle").text(function (d, i) {
            return '' + self.data[i].value;
        });
        //// add legend
        // Add a legendLabel to each arc slice...
        arcs.append("svg:text")
            .attr("transform", function (d) {
            //we have to make sure to set these before calling arc.centroid
            d.outerRadius = r + 50; // Set Outer Coordinate
            d.innerRadius = r + 45; // Set Inner Coordinate
            return "translate(" + arc.centroid(d) + ")";
        })
            .attr("text-anchor", "middle") //center the text on it's origin
            .style("fill", "Purple")
            .style("font", "bold 12px Arial")
            .text(function (d, i) {
            return self.data[i].label;
        }); //get the label from our original data array
    }
    ngOnChanges() {
        this.render(this.data);
    }
};
__decorate([
    Input()
], PieChart.prototype, "data", void 0);
PieChart = __decorate([
    Component({
        selector: 'pie-chart',
        templateUrl: 'templates/pie-chart.html',
        stylesUrl: ['static/css/main.css']
    }),
    __param(0, Inject(ElementRef)),
    __param(1, Attribute('width')),
    __param(2, Attribute('height')),
    __param(3, Attribute('title'))
], PieChart);
