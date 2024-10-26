using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationBetweenDocumentsAndAuthorities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AuthorityId",
                table: "Documents",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Documents_AuthorityId",
                table: "Documents",
                column: "AuthorityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Authorities_AuthorityId",
                table: "Documents",
                column: "AuthorityId",
                principalTable: "Authorities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Authorities_AuthorityId",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_AuthorityId",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "AuthorityId",
                table: "Documents");
        }
    }
}
