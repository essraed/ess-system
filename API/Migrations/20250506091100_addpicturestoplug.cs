using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class addpicturestoplug : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BlogId",
                table: "FileEntities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_BlogId",
                table: "FileEntities",
                column: "BlogId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntities_Blogs_BlogId",
                table: "FileEntities",
                column: "BlogId",
                principalTable: "Blogs",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileEntities_Blogs_BlogId",
                table: "FileEntities");

            migrationBuilder.DropIndex(
                name: "IX_FileEntities_BlogId",
                table: "FileEntities");

            migrationBuilder.DropColumn(
                name: "BlogId",
                table: "FileEntities");
        }
    }
}
